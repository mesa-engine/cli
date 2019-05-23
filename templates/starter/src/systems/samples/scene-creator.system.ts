import { System, Engine, Entity } from "@mesa-engine/core";
import { ParticleBlueprint, MesaTextBlueprint } from "../../blueprints";
import { PositionComponent } from "../../components";

export class SceneCreatorSystem extends System {

  onAttach(engine: Engine) {
    super.onAttach(engine);
    this.generateParticles(engine, 100);
    this.addMesaText(engine);
  }

  update(engine: Engine, delta: number) { }

  addMesaText(engine: Engine) {
    const mesaText = engine.buildEntity(MesaTextBlueprint);
    const positionComponent = mesaText.getComponent(PositionComponent);
    positionComponent.x = window.innerWidth / 2 - 56;
    positionComponent.y = window.innerHeight / 2;
    engine.addEntity(mesaText);
  }

  generateParticles(engine: Engine, amount: number) {
    for (var i = 0; i < amount; i++) {
      engine.addEntity(this.buildParticle(engine));
    }
  }

  buildParticle(engine: Engine): Entity {
    const particle: Entity = engine.buildEntity(ParticleBlueprint);
    const positionComponent = particle.getComponent(PositionComponent);
    positionComponent.x = Math.floor(Math.random() * window.innerWidth); 
    positionComponent.y = Math.floor(Math.random() * window.innerHeight); 
    return particle;
  }
}