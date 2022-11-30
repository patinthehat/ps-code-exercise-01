import { Driver } from '@/lib/Driver';
import { Shipment } from '@/lib/Shipment';

export interface ShipmentAssignment {
    shipment: Shipment;
    driver: Driver;
    suitabilityScore: number;
}
