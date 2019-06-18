import { Blueprint } from '@mesa-engine/core';
import { RenderableBlueprint } from './renderable.blueprint';
import { SizeComponent, RisingAnimationComponent, RenderComponent } from '../../components';

export class ParticleBlueprint implements Blueprint {
    blueprints = [new RenderableBlueprint];
    components = [
        {
            component: SizeComponent, 
            value: <SizeComponent> {
                value: Math.floor(Math.random() * 10) + 1
            }
        },
        {
            component: RisingAnimationComponent, 
            value: <RisingAnimationComponent> {
                speed: Math.random() * 10 + 2
            }
        },
        {
            component: RenderComponent, 
            value: <RenderComponent> {
                opacity: Math.random()
            }
        }
    ];
}