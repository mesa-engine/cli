import { Blueprint } from '@mesa-engine/core';
import { RenderableBlueprint } from './renderable.blueprint';
import { TextComponent } from '../../components';

export class MesaTextBlueprint implements Blueprint {
    blueprints = [new RenderableBlueprint];
    components = [
        {
            component: TextComponent, 
            values: <TextComponent> {
                text: 'MESA', 
                font: '52px Impact, Courier'
            }
        }
    ];
}