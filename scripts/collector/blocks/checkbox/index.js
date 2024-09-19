// Import Material-UI UMD
const MUI = window["material-ui"];

// Import conditions
import "./conditions";

@TripettoCollector.node("tripetto-block-checkbox")
class Checkbox extends TripettoCollector.NodeBlock {
    OnRender(instance, action) {
        const slot = this.SlotAssert("checked");
        const checkbox = this.DataAssert(instance, slot);

        return (
            <MUI.Paper elevation={1} style={{ padding: "8px 24px" }}>
                <MUI.FormGroup>
                    {this.Node.Props.Explanation && <MUI.FormHelperText>{this.Node.Props.Explanation}</MUI.FormHelperText>}
                    <MUI.FormControlLabel
                        control={
                            <MUI.Switch defaultChecked={checkbox.Value} onChange={(e: {}, checked: boolean) => (checkbox.Value = checked)} />
                        }
                        label={this.Node.Props.Name}
                    />
                </MUI.FormGroup>
            </MUI.Paper>
        );
    }

    OnValidate(instance): boolean {
        const slot = this.SlotAssert("checked");
        const checkbox = this.DataAssert(instance, slot);

        return !slot.Required || checkbox.Value;
    }
}
