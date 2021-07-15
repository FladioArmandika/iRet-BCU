import { create } from 'tailwind-rn';
import styles from '../../styles.json';

const { tailwind, getColor } = create(styles);

export { tailwind as css, getColor };
