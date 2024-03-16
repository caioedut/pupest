import pmex from 'pmex';

pmex(`prettier "{scripts,src}/**/*.{js,jsx,ts,tsx}" --check`);

pmex(`eslint "{scripts,src}/**/*.{js,jsx,ts,tsx}" --max-warnings=0`);

pmex('tsc --noEmit --skipLibCheck');
