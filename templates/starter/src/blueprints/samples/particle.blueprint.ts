import { Blueprint } from '@mesa-engine/core';
import * as c from '../../components';
import { RenderableBlueprint } from './renderable.blueprint';

export class ParticleBlueprint implements Blueprint {
    blueprints = [new RenderableBlueprint];
    components = [
        {component: c.SizeComponent, values: {value: Math.floor(Math.random() * 10) + 1}},
        {component: c.RisingAnimationComponent, values: {speed: Math.random() * 10 + 2}},
        {component: c.RenderComponent, values: {opacity: Math.random()}}
    ];
}