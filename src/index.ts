import { Driver } from '@/lib/Driver';
import { readTextFileLines } from '@/lib/helpers';
import { Shipment } from '@/lib/Shipment';
import { ShipmentManager } from '@/lib/ShipmentManager';
import { Command } from 'commander';
const program = new Command();

/*
The top-secret algorithm is:
● If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
● If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1.

● If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.

Write an application in the language of your choice that assigns shipment destinations to drivers in a way that maximizes the total SS over the set of drivers.
Each driver can only have one shipment and each shipment can only be offered to one driver.
Your program should run on the command line and take as input two newline separated files, the first containing the street addresses of the shipment destinations and the second containing the names of the drivers.
The output should be the total SS and a matching between shipment destinations and drivers. You do not need to worry about malformed input, but you should certainly handle both upper and lower case names.
*/

program.name('ps-code-exercise-01').version('1.0.0');

program
    .command('route-shipments', { isDefault: true })
    .description('Route shipments for the given input files')
    .argument('[addresses]', 'addresses filename', 'datasets/01/shipments.txt')
    .argument('[driversFile]', 'drivers filename', 'datasets/01/drivers.txt')
    .action((addressesFile, driversFile, options) => {
        addressesFile = `${__dirname}/${addressesFile}`;
        driversFile = `${__dirname}/${driversFile}`;

        console.log(`Routing shipments for ${addressesFile.replace(__dirname, '.')} and ${driversFile.replace(__dirname, '.')}`);
        console.log('----');

        const addressesData = readTextFileLines(addressesFile);
        const shipments: Shipment[] = addressesData.map(address => new Shipment(address));
        const immutableShipments = shipments.slice(0);

        const driversData = readTextFileLines(driversFile);
        const drivers: Driver[] = driversData.map(driver => new Driver(driver));

        const shipmentManager = new ShipmentManager(shipments, drivers);

        shipmentManager.assignShipmentsToDrivers();

        console.log('Driver assignments for each shipment:');
        console.log(
            shipmentManager.assignments
                .map(assignment => `${assignment.shipment.streetAddress} => ${assignment.driver.name} (${assignment.suitabilityScore})`)
                .join('\n'),
        );

        console.log('----');
        console.log('Top drivers for each shipment:');
        console.log('----');

        immutableShipments.forEach(shipment => {
            const driver = shipment.getBestDriver(drivers);
            console.log(`Shipment: ${shipment.streetAddress}; best driver: ${driver.name} (${shipment.suitabilityScoreForDriver(driver)})`);
        });

        console.log('----');
        console.log('Shipment driver rankings:');
        console.log('----');

        immutableShipments.forEach(shipment => {
            console.log(`Shipment: ${shipment.streetAddress};`);
            const rankedDrivers: any[] = [];

            drivers.forEach(driver => {
                const score = shipment.suitabilityScoreForDriver(driver);
                rankedDrivers.push({ driver, score });
            });

            rankedDrivers.sort((a, b) => b.score - a.score);

            rankedDrivers.forEach((ranked: { driver: Driver; score: number }) => {
                console.log(`   - ${ranked.driver.name} (${ranked.score})`);
            });
        });
    });

program.parse();
