const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {
    "use strict";
    let users; // needs to be accessible in beforeEach() and it() hence
                // has to be declared outside of describe.

    beforeEach(() => {
       users = new Users();
       users.users = [{
           id: 1,
           name: 'Mike',
           room: 'Node Course'
       }, {
           id: 2,
           name: 'Jen',
           room: 'React Course'
       }, {
           id: 3,
           name: 'Julie',
           room: 'Node Course'
       }];
    });


    it('should add new user', () => {
       let users = new Users();
       let user = {
           id: '123',
           name: 'Gary',
           room: 'room 1'
       };
       let resUsers = users.addUser(user.id, user.name, user.room);

       expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let removedUser = users.removeUser(3);

        expect(users.users.length).toBe(2);
        expect(removedUser.id).toEqual(3);
    });

    it('should not remove a user', () => {
        let removedUser = users.removeUser(56);

        expect(users.users.length).toBe(3);
        expect(removedUser).toNotExist();
    });

    it('should find user', () => {
        let objectUser = users.getUser(2);

        expect(objectUser).toEqual(users.users[1]);
    });

    it('should not find user', () => {
        let objectUser = users.getUser(4);

        expect(objectUser).toNotExist();
    });

    it('should return names for node course', () => {
        let userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike','Julie']);
    });

    it('should return names for React course', () => {
        let userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });
});