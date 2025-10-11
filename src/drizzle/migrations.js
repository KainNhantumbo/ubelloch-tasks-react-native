// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_gigantic_skaar.sql';
import m0001 from './0001_plain_thor_girl.sql';
import m0002 from './0002_peaceful_solo.sql';
import m0003 from './0003_bizarre_war_machine.sql';
import m0004 from './0004_ancient_morg.sql';
import m0005 from './0005_bumpy_bastion.sql';
import m0006 from './0006_shiny_zodiak.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004,
m0005,
m0006
    }
  }
  