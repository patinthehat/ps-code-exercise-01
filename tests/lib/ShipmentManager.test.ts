/* eslint-disable array-element-newline */
import { Driver } from '@/lib/Driver';
import { Shipment } from '@/lib/Shipment';
import { ShipmentManager } from '@/lib/ShipmentManager';

it('returns the correct driver and score for a shipment', () => {
    const shipments = [ new Shipment('9 Olive Avenue'), new Shipment('7192 Glendale Lane'), new Shipment('1 Main Street') ];

    const drivers = [ new Driver('Malcolm Parker'), new Driver('Zachariah Hardwick'), new Driver('Lillian Mccormick') ];

    const mgr = new ShipmentManager(shipments, drivers);

    mgr.assignShipmentsToDrivers();

    expect(mgr.assignments[0].shipment.address).toEqual('9 Olive Avenue');
    expect(mgr.assignments[0].driver.name).toEqual('Malcolm Parker');
    expect(mgr.assignments[0].suitabilityScore).toEqual(20.25);

    expect(mgr.assignments[1].shipment.address).toEqual('7192 Glendale Lane');
    expect(mgr.assignments[1].driver.name).toEqual('Zachariah Hardwick');
    expect(mgr.assignments[1].suitabilityScore).toEqual(68.34375);
});
