const request = require('supertest');
const sequelize = require("../db/db");
const models = require("../db/Models");
const { default: axios } = require('axios');
jest.useRealTimers();

describe('Group Chat Application APIs', () => {
    let adminToken;
    let groupId;
    let memberId;
    let newUserId;
    let messageId;

    beforeAll(async () => {
        try {
            console.log(process.env.DB_URL);
            await models.createModels();
            const adminLoginResponse = await axios.post('http://localhost:3000/login', {
                userName: 'test_admin',
                password: 'password'
            });

            adminToken = adminLoginResponse.data.accessToken;

        } catch (error) {
            console.log(error.message);
        }
    });

    it('Login into application', async () => {
        const res = await axios.post('http://localhost:3000/login', {
            userName: 'test_admin',
            password: 'password'
        });
        expect(res.status).toEqual(200);
    });

    it('Create First Group', async () => {
        // Create a normal group with this user
        const res = await axios.post(
            'http://localhost:3000/group/existing',
            {
                groupName: "Group 2"
            },
            {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            }
        );
        groupId = res.data.data.group_id;
        expect(res.status).toEqual(200);
    });

    it('Get members of group : Only Admin for now', async () => {
        const res = await axios.get(`http://localhost:3000/member/group/${groupId}`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        memberId = res.data.data[0].member_id;
        expect(res.status).toEqual(200);
    });

    it('Get members by ID', async () => {
        const res = await axios.get(`http://localhost:3000/member/${memberId}`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        expect(res.status).toEqual(200);
    });

    it('Add new user', async () => {
        const res = await axios.post(`http://localhost:3000/member/new`,
            {
                "userName": "new-user123",
                "password": "New@123",
                "fullName": "New User"
            },
            {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

        newUserId = res.data.data.user_id;
        expect(res.status).toEqual(200);
    });

    it('Assign new user to group', async () => {
        const res = await axios.post(`http://localhost:3000/member`,
            {
                "userId": newUserId,
                "groupId": groupId
            },
            {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

        expect(res.status).toEqual(200);
    });

    it('Send a message in group', async function () {
        const res = await axios.post(`http://localhost:3000/messages/send`,
            {
                messageText: "Hello Baby!",
                groupId: groupId
            },
            {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            });

        messageId = res.data.data.message_id;
        expect(res.status).toEqual(200);
    });

    it("Like a Message", async () => {
        const res = await axios.post(`http://localhost:3000/messages/like`,
            {
                messageId: messageId
            },
            {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            }
        );

        expect(res.status).toEqual(200);
    });

    it("Disike a Message", async () => {
        const res = await axios.delete(`http://localhost:3000/messages/remove-like/${messageId}`,
            {
                headers: {
                    'Authorization': `Bearer ${adminToken}`
                }
            }
        );

        expect(res.status).toEqual(200);
    });
});


