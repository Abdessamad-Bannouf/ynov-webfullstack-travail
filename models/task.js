const prisma = require('../util/prisma');

class Task {
    static async findAll() {
        return await prisma.task.findMany();
    }

    static async findById(id) {
        return await prisma.task.findUnique({ where: { id: parseInt(id) } });
    }

    static async create(data) {
        return await prisma.task.create({ data });
    }

    static async update(id, data) {
        return await prisma.task.update({
            where: { id: parseInt(id) },
            data,
        });
    }

    static async delete(id) {
        return await prisma.task.delete({ where: { id: parseInt(id) } });
    }
}

module.exports = Task;