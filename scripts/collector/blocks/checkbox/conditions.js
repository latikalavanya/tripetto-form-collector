@TripettoCollector.condition("tripetto-block-checkbox.checked")
class CheckboxChecked extends TripettoCollector.ConditionBlock {
    OnCondition(instance) {
        const checked = this.DataAssert(instance);

        return checked.Value === true;
    }
}

@TripettoCollector.condition("tripetto-block-checkbox.unchecked")
class CheckboxUnchecked extends TripettoCollector.ConditionBlock {
    OnCondition(instance) {
        const checked = this.DataAssert(instance);

        return checked.Value === false;
    }
}
