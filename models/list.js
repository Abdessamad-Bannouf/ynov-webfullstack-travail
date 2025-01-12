const prisma = require('../util/prisma');

class List {
    static async findAll() {
        return await prisma.taskList.findMany();
    }

    static async findById(id) {
        return await prisma.taskList.findUnique({ where: { id: parseInt(id) } });
    }

    static async create(data) {
        return await prisma.taskList.create({ data });

    }

    static async update(id, data) {
        return await prisma.taskList.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    static async delete(id) {
        return await prisma.taskList.delete({ where: { id: parseInt(id) } });
    }
}

module.exports = List;