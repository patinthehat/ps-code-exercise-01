import { calculateStringStatistics } from '@/lib/helpers';
import { Shipment } from '@/lib/Shipment';

export class Driver {
    public name: string;
    public shipment: Shipment | null = null;
    public numberOfVowelsInName = 0;
    public numberOfConsonantsInName = 0;

    constructor(name: string) {
        this.name = name;
        this.calculateVowelsAndConsonantsInName();
    }

    public calculateVowelsAndConsonantsInName(): void {
        const data = calculateStringStatistics(this.name);

        this.numberOfVowelsInName = data.vowels;
        this.numberOfConsonantsInName = data.consonants;
    }

    public suitabilityScoreForShipment(shipment: Shipment): number {
        return shipment.suitabilityScoreForDriver(this);
    }
}
