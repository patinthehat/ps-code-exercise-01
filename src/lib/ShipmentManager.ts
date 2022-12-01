import { Driver } from '@/lib/Driver';
import { Shipment } from '@/lib/Shipment';
import { ShipmentAssignment } from '@/types/ShipmentAssignment';

export class ShipmentManager {
    public assignments: ShipmentAssignment[] = [];

    constructor(public shipments: Shipment[], public drivers: Driver[]) {
        //
    }

    public assignShipmentsToDrivers(): void {
        this.assignments = [];

        const scores = {};

        this.drivers.forEach(driver => {
            scores[driver.name] = {};
        });

        this.shipments.forEach(shipment => {
            this.drivers.forEach(driver => {
                scores[driver.name][shipment.address] = driver.suitabilityScoreForShipment(shipment);
            });
        });

        for (const driver of this.drivers) {
            let bestScore = 0;
            let bestShipment: any = null;

            for (const shipment of this.shipments) {
                if (scores[driver.name][shipment.address] > bestScore) {
                    bestScore = scores[driver.name][shipment.address];
                    bestShipment = shipment;
                }
            }

            if (bestShipment) {
                this.assignments.push({
                    driver,
                    shipment: bestShipment,
                    suitabilityScore: bestScore,
                });

                this.shipments = this.shipments.filter(shipment => shipment.address.toLowerCase() !== bestShipment.address.toLowerCase());
            }
        }
    }
}
