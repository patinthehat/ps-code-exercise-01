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

        for (const shipment of this.shipments) {
            const driver = shipment.getBestDriver(this.drivers);
            driver.shipment = shipment;

            this.drivers = this.drivers.filter(d => d.name !== driver.name);
            this.shipments = this.shipments.filter(s => s.address !== shipment.address);

            this.assignments.push({
                driver,
                shipment,
                suitabilityScore: shipment.suitabilityScoreForDriver(driver),
            });
        }
    }
}
