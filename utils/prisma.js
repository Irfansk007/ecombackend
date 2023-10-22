import { PrismaClient } from '@prisma/client'


 /**
 * @type {PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>}
 */
 export let prisma

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
}
// `stg` or `dev`
else {
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}

	prisma = global.prisma
}

