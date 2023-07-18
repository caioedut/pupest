import pmex from 'pmex';

pmex(`prettier "{scripts,src,test}/**/*.{js,jsx,ts,tsx}" --check`);

pmex(`eslint "{scripts,src,test}/**/*.{js,jsx,ts,tsx}" --max-warnings=0`);

pmex(`tsc --noEmit`);
