import { System, Family, Engine, FamilyBuilder } from "@mesa-engine/core";
import { PositionComponent, RisingAnimationComponent } from "../../components";

export class RisingAnimationSystem extends System {
  family: Family;

  onAttach(engine: Engine) {
    super.onAttach(engine);
    this.family = new FamilyBuilder(engine).include(PositionComponent, RisingAnimationComponent).build();
  }

  update(engine: Engine, delta: number) {
    for (let entity of this.family.entities) {
      const positionComponent = entity.getComponent(PositionComponent);
      const animationComponent = entity.getComponent(RisingAnimationComponent);
      if(positionComponent.y <= -10) {
        positionComponent.x = Math.floor(Math.random() * window.innerWidth);
        positionComponent.y = window.innerHeight + 10;
      } else {
        positionComponent.y -= 0.1 * animationComponent.speed;
      }
    }
  }
}