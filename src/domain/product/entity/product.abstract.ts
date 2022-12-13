import Entity from '../../@shared/entity/entity.abstract';

export default class ProductInterface extends Entity {
  protected _name!: string;

  protected _price!: number;

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
