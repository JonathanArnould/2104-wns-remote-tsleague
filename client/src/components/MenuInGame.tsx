import React from 'react';
import { Classes, Icon, Menu, MenuDivider, MenuItem } from '@blueprintjs/core';

function MenuInGame(): JSX.Element {
  return (
    <div style={{ width: '1px'}}>
      <Menu className={Classes.ELEVATION_1}>
        <MenuDivider />
        <MenuItem icon="timeline-events" text="Agenda" />
        <MenuItem icon="learning" text="Classe" />
        <MenuItem icon="folder-open" text="Mes documents">
          <MenuItem icon="annotation" text="Mes notes" />
          <MenuItem icon="video" text="Mes videos" />
          <MenuItem icon="link" text="Mes ressources" />
        </MenuItem>
        <MenuDivider />
        <MenuItem
          icon="cog"
          labelElement={<Icon icon="share" />}
          text="Paramètres"
        />
        <MenuItem icon="log-out" text="Déconnecter" />
      </Menu>
    </div>
  );
}

export default MenuInGame;
