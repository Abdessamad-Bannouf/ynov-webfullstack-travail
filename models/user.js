const prisma = require('../util/prisma');

class User {
    static async findAll() {
        return await prisma.user.findMany();
    }

    static async findById(id) {
        return await prisma.user.findUnique({ where: { id: parseInt(id) } });
    }

    static async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    }

    static async create(data) {
        return await prisma.user.create({ data });
    }

    static async update(id, data) {
        return await prisma.user.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    static async delete(id) {
        return await prisma.user.delete({ where: { id: parseInt(id) } });
    }
}

module.exports = User;