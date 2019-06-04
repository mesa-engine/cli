import { Blueprint } from '@mesa-engine/core';
import { PositionComponent, RenderComponent } from '../../components';

export class RenderableBlueprint implements Blueprint {
    components = [
        {component: PositionComponent}, 
        {component: RenderComponent}
    ];
}