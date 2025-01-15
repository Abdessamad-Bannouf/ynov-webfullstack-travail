const prisma = require('../util/prisma');

class Message {
    static async findAll() {
        return await prisma.message.findMany();
    }

    static async findById(id) {
        return await prisma.message.findUnique({ where: { id: parseInt(id) } });
    }

    static async create(data) {
        return await prisma.message.create({ data });
    }

    static async update(id, data) {
        return await prisma.message.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    static async delete(id) {
        return await prisma.message.delete({ where: { id: parseInt(id) } });
    }
}

module.exports = Message;