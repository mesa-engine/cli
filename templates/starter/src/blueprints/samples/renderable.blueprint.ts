import { Blueprint } from '@mesa-engine/core';
import * as c from '../../components';

export class RenderableBlueprint implements Blueprint {
    components = [
        {component: c.PositionComponent}, 
        {component: c.RenderComponent}
    ];
}