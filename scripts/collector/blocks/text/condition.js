@TripettoCollector.condition("tripetto-block-text.match")
class TextMatchCondition extends TripettoCollector.ConditionBlock {
    OnCondition(instance) {
        const value = this.DataAssert(instance);

        return value.String === this.Props.Match ? true : false;
    }
}
