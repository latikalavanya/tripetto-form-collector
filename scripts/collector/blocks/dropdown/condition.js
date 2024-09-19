@TripettoCollector.condition("tripetto-block-dropdown.is-option-selected")
class DropdownCondition extends TripettoCollector.ConditionBlock {
  OnCondition(instance) {
    const option = this.DataAssert(instance);

    return option.Reference === this.Props.Option ? true : false;
  }
}
