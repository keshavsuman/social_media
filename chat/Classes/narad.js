class Narad{

    static users = new Map();

    static add(user){
        this.users.set(user.userId,user);
        return true;
    }
    
    static remove(user){
        this.users.delete(user.userId);
        return true;
    }

    static isOnline(userId){
        return this.users.has(userId);
    }

    static getUser(userId){
        return this.users.get(userId);
    }
    
}

module.exports = Narad;