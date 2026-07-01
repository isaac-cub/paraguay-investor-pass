import { experimental_createIslandRoute } from '@tinacms/astro/experimental';
import { islands } from '../../lib/islands';

// On-demand endpoint the Tina bridge POSTs to on every keystroke to re-render
// the edited region with draft content. Runs as a serverless function on Vercel.
export const prerender = false;
export const ALL = experimental_createIslandRoute(islands);
