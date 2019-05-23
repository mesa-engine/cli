import { System, Family, Engine, FamilyBuilder } from "@mesa-engine/core";
import { PositionComponent, RenderComponent, TextComponent, SizeComponent } from "../../components";

export class RenderSystem extends System {
  family: Family;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor() {
    super();
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'canvas';
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');
  }

  onAttach(engine: Engine) {
    super.onAttach(engine);
    this.family = new FamilyBuilder(engine).include(PositionComponent, RenderComponent).build();
  }

  update(engine: Engine, delta: number) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let entity of this.family.entities) {
      const position = entity.getComponent(PositionComponent);
      const render = entity.getComponent(RenderComponent);
      this.ctx.fillStyle = render.color;
      this.ctx.globalAlpha = render.opacity;

      if (entity.hasComponent(TextComponent)) {
        const textComponent = entity.getComponent(TextComponent);
        this.ctx.font = textComponent.font;
        this.ctx.fillText(textComponent.text, position.x, position.y);
      }
      if (entity.hasComponent(SizeComponent)) {
        const size = entity.getComponent(SizeComponent);
        this.ctx.fillRect(position.x, position.y, size.value, size.value);
      }
    }
  }
}