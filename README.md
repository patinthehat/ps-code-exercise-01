# Platform Science Code Exercise 1

---

[![Run Tests](https://github.com/patinthehat/ps-code-exercise-01/actions/workflows/run-tests.yml/badge.svg)](https://github.com/patinthehat/ps-code-exercise-01/actions/workflows/run-tests.yml) [![codecov](https://codecov.io/gh/patinthehat/ps-code-exercise-01/branch/main/graph/badge.svg?token=BZenrQO00O)](https://codecov.io/gh/patinthehat/ps-code-exercise-01)

## Overview

This exercise takes input of a list of addresses and drivers, and outputs the best driver for each address. Once a driver has been assigned to a shipment, they cannot be assigned to another shipment. Assignments are done sequentially based on shipment (address).

Additionally, it also can:

-   List the top five drivers for a given address
-   List the best driver for each shipment without considering previous shipments

## Assumptions

This code exercise assumes the following:

-   The address/shipment files contain a single address per line, in this format: `street, city, state postalCode`
-   The address/shipment items contain state abbreviations only, not full state names (e.g. `CA` instead of `California`)
-   The address/shipment items are US addresses only and postal codes are 5 digits
-   The driver file contains a single driver per line, in this format: `firstName lastName`

## Setup

```bash
npm install
```

## Running the application

To run the default code exercise, run the following command:

```bash
npm run dev
```

This will run the default code exercise with test datasets.

Additionally, there are three commands available:

-   `route-shipments`
-   `best-driver`
-   `top-five`

```bash
# run one of the available commands with the following command:
npm run dev -- [command_name] [addresses_filename] [drivers_filename]
```

The previous command will compile the TypeScript code with `esbuild` and run the application using the provided parameters. Filenames should be absolute file paths.

## Testing

This project uses Jest for unit tests. To run the test suite, run:

```bash
npm run test
```

To display the code coverage for the entire application at the file level, run:

```bash
npm run test:coverage
```

---

## Credits

-   [Patrick Organ](https://github.com/patinthehat)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.
