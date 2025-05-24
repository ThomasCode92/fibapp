import { config as baseConfig } from "@repo/eslint-config/react-internal";
import { config as testingLibraryConfig } from "@repo/eslint-config/testing-library";

export default [...baseConfig, { ...testingLibraryConfig }];
