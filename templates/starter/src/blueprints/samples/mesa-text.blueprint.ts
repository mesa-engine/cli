import { Blueprint } from '@mesa-engine/core';
import * as c from '../../components';
import { RenderableBlueprint } from './renderable.blueprint';

export class MesaTextBlueprint implements Blueprint {
    blueprints = [new RenderableBlueprint]
    components = [
        {component: c.TextComponent, values: {text: 'MESA', font: '52px Impact, Courier'}}
    ];
}