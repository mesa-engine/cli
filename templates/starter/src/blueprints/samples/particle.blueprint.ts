import { Blueprint } from '@mesa-engine/core';
import { RenderableBlueprint } from './renderable.blueprint';
import { SizeComponent, RisingAnimationComponent, RenderComponent } from '../../components';

export class ParticleBlueprint implements Blueprint {
    blueprints = [new RenderableBlueprint];
    components = [
        {
            component: SizeComponent, 
            values: <SizeComponent> {
                value: Math.floor(Math.random() * 10) + 1
            }
        },
        {
            component: RisingAnimationComponent, 
            values: <RisingAnimationComponent> {
                speed: Math.random() * 10 + 2
            }
        },
        {
            component: RenderComponent, 
            values: <RenderComponent> {
                opacity: Math.random()
            }
        }
    ];
}