import { Driver } from '@/lib/Driver';
import { calculateStringStatistics, normalizeStreetAddress } from '@/lib/helpers';

export class Shipment {
    public streetAddress = '';

    constructor(public address: string) {
        this.streetAddress = this.getStreetAddress();
    }

    public getStreetAddress(): string {
        const result = this.address.split(',')[0].trim();
        return normalizeStreetAddress(result);
    }

    public get city(): string {
        return this.address.split(',')[1].trim();
    }

    public get state(): string {
        const match = this.address.match(/([A-Z]{2})\s+\d{5}/);
        if (match) {
            return match[0];
        }

        return 'UNKNOWN';
    }

    public get postalCode(): string {
        const match = this.address.match(/([A-Z]{2})\s+\d{5}/);
        if (match) {
            return match[1];
        }

        return '00000';
    }

    public suitabilityScoreForDriver(driver: Driver): number {
        const addressStats = calculateStringStatistics(this.streetAddress);
        const nameStats = calculateStringStatistics(driver.name);
        let baseSuitabilityScore = 0;
        let result = 0;

        // odd
        if (addressStats.length % 0 !== 0) {
            baseSuitabilityScore = nameStats.vowels * 1.0;
        } else {
            baseSuitabilityScore = nameStats.vowels * 1.5;
        }

        result = baseSuitabilityScore;

        // common factors
        if (addressStats.length % 2 === 0 && nameStats.length % 2 === 0) {
            result *= 1.5;
        }

        return result;
    }

    public getBestDriver(drivers: Driver[]): Driver {
        let bestDriver: Driver | null = null;
        let bestScore = 0;

        drivers.forEach(driver => {
            const score = this.suitabilityScoreForDriver(driver);
            if (score > bestScore) {
                bestScore = score;
                bestDriver = driver;
            }
        });

        return bestDriver || drivers[0];
    }
}
