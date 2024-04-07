import projectData from './project-data';

/* eslint-disable import/no-unresolved */
import backdrop from '!raw-loader!./cd21514d0531fdffb22204e0ec5ed84a.svg';
import costume1 from '!raw-loader!./f02dc12ef367ece5d75fd23937cfc9e6.svg';
/* eslint-enable import/no-unresolved */
import { TextEncoder } from '../tw-text-encoder';

const defaultProject = translator => {
    const encoder = new TextEncoder();

    const projectJson = projectData(translator);
    return [{
        id: 0,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    }, {
        id: 'cd21514d0531fdffb22204e0ec5ed84a',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop)
    }, {
        id: 'f02dc12ef367ece5d75fd23937cfc9e6',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(costume1)
    }];
};

export default defaultProject;
