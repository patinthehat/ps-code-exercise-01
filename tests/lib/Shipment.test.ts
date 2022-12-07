/* eslint-disable array-element-newline */
import { Driver } from '@/lib/Driver';
import { Shipment } from '@/lib/Shipment';

it('calculates the correct suitability score for a shipment and driver', () => {
    const shipment = new Shipment('9 Olive Avenue');
    const driver = new Driver('Malcolm Parker');

    expect(shipment.suitabilityScoreForDriver(driver)).toEqual(20.25);
});

it('finds the best driver for a shipment', () => {
    const shipment = new Shipment('9 Olive Avenue');

    const drivers = [new Driver('Zachariah Hardwick'), new Driver('Malcolm Parker'), new Driver('Lillian Mccormick')];

    expect(shipment.getBestDriver(drivers).name).toEqual(drivers[1].name);
});

it('throws an error when no drivers are provided', () => {
    const shipment = new Shipment('9 Olive Avenue');

    expect(() => {
        shipment.getBestDriver([]);
    }).toThrowErrorMatchingSnapshot();
});

it('gets the state from the address', () => {
    const shipment = new Shipment('9 Olive Avenue, Somewhere, CA 90210');

    expect(shipment.state).toEqual('CA');
});

it('gets the postal code from the address', () => {
    const shipment = new Shipment('9 Olive Avenue, Somewhere, CA 90210');

    expect(shipment.postalCode).toEqual('90210');
});

it('gets the city from the address', () => {
    const shipment = new Shipment('9 Olive Avenue, Somewhere, CA 90210');

    expect(shipment.city).toEqual('Somewhere');
});
