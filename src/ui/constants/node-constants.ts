/*=========================================================
    Imports
=========================================================*/

import ICON_SCREEN from '../assets/screen.svg';
import ICON_FALLBACK from '../assets/fallback.svg';
import ICON_FLOW from '../assets/flow.svg';
import ICON_ASSIGNMENT from '../assets/assignment.svg';
import ICON_SIGNPOST from '../assets/signpost.svg';
import ICON_SORT from '../assets/sort.svg';
import ICON_LOOP from '../assets/loop.svg';
import ICON_FILTERLIST from '../assets/filterList.svg';
import ICON_RECORD_CREATE from '../assets/record_create.svg';
import ICON_RECORD_UPDATE from '../assets/record_update.svg';
import ICON_RECORD_DELETE from '../assets/record_delete.svg';
import ICON_RECORD_LOOKUP from '../assets/record_lookup.svg';
import ICON_SKIP_BACK from '../assets/skip_back.svg';
import ICON_PLAY from '../assets/play.svg';

/*=========================================================
    Constants
=========================================================*/

const THEME_START = "text-white bg-[#0B827C] rounded p-2";
const THEME_DATA = "text-white bg-[#FF538A] rounded p-2";
const THEME_LOGIC = "text-white bg-[#DD7A01] rounded p-2";
const THEME_SCREEN = "text-white bg-[#1B96FF] rounded p-2";
const THEME_INTERACTION = "text-white bg-[#032D60] rounded p-2";

export const TYPE_CONSTANTS: Record<string, {icon: string, theme: string, canFault: boolean}> = {
  screen: {
    icon: ICON_SCREEN,
    theme: THEME_SCREEN,
    canFault: false
  },
  action: {
    icon: ICON_FALLBACK,
    theme: THEME_INTERACTION,
    canFault: true
  },
  subflow: {
    icon: ICON_FLOW,
    theme: THEME_INTERACTION,
    canFault: true
  },
  assignment: {
    icon: ICON_ASSIGNMENT,
    theme: THEME_LOGIC,
    canFault: false
  },
  decision: {
    icon: ICON_SIGNPOST,
    theme: THEME_LOGIC,
    canFault: false
  },
  sort: {
    icon: ICON_SORT,
    theme: THEME_LOGIC,
    canFault: false
  },
  loop: {
    icon: ICON_LOOP,
    theme: THEME_LOGIC,
    canFault: false
  },
  filter: {
    icon: ICON_FILTERLIST,
    theme: THEME_LOGIC,
    canFault: false
  },
  recordCreate: {
    icon: ICON_RECORD_CREATE,
    theme: THEME_DATA,
    canFault: true
  },
  recordUpdate: {
    icon: ICON_RECORD_UPDATE,
    theme: THEME_DATA,
    canFault: true
  },
  recordDelete: {
    icon: ICON_RECORD_DELETE,
    theme: THEME_DATA,
    canFault: true
  },
  recordLookup: {
    icon: ICON_RECORD_LOOKUP,
    theme: THEME_DATA,
    canFault: true
  },
  recordRollback: {
    icon: ICON_SKIP_BACK,
    theme: THEME_DATA,
    canFault: true
  },
  start: {
    icon: ICON_PLAY,
    theme: THEME_START,
    canFault: false
  }
};