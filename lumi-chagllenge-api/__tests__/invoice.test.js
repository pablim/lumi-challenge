import invoice from '../repository/invoice.js'
import { prisma as db } from '../db/index.js'

describe('bd', () => {
    test('insertMany', async () => {
        data = [
            {
                clientNumber: "7005400387",
                installationNumber: "3000055479",
                referenceMonth: 6,
                referenceYear: 2023,
                powerQuantity: 50,
                powerValue: 43.28,
                sceeePowerQuantity: 1007,
                sceeePowerValue: 652.55,
                compensatedPowerQuantity: 1007,
                compensatedPowerValue: -620,
                publicContribution: 49.43,
            },
            {
                clientNumber: "7202788969",
                installationNumber: "3001165684",
                referenceMonth: 7,
                referenceYear: 2023,
                powerQuantity: 50,
                powerValue: 47.96,
                sceeePowerQuantity: 616,
                sceeePowerValue: 315.32,
                compensatedPowerQuantity: 616,
                compensatedPowerValue: -300.19,
                publicContribution: 41.19,
            }

        ]
        const result = await invoice.insertMany({data})
        expect(result).toBe(2)
    });

    test('getByClientNumber', async () => {
        const res = await salesRepository.getValueByProdAndSeller()
        expect(res.rows.length).toBeGreaterThan(0)
        db.pool.end()
    });

    test('getClientNumbers', async () => {
        const res = await salesRepository.getValueByProdAndSeller()
        expect(res.rows.length).toBeGreaterThan(0)
        db.pool.end()
    });
})