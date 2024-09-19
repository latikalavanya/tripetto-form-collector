// Import Material-UI UMD
const MUI = window["material-ui"];

// Import condition
import "./condition";

@TripettoCollector.node("tripetto-block-text")
class Text extends TripettoCollector.NodeBlock {
    OnRender(instance, action) {
        const slot = this.SlotAssert("value");
        const value = this.DataAssert(instance, slot);

        return (
            <MUI.Paper elevation={1} style={{ padding: "8px 24px 24px" }}>
                {this.Node.Props.NameVisible &&
                    this.Node.Props.Name && (
                        <MUI.Typography variant="headline" color="inherit" style={{ paddingTop: "8px" }}>
                            {this.Node.Props.Name}
                        </MUI.Typography>
                    )}

                {this.Node.Props.Description && (
                    <MUI.Typography variant="subheading" color="inherit" style={{ paddingTop: "8px" }}>
                        {this.Node.Props.Description}
                    </MUI.Typography>
                )}

                <MUI.TextField
                    type="text"
                    margin="normal"
                    fullWidth
                    required={slot.Required}
                    defaultValue={value.Value}
                    label={this.Node.Props.Placeholder || this.Node.Props.Name}
                    helperText={this.Node.Props.Explanation}
                    onChange={(e) => (value.Value = e.target.value)}
                    onBlur={(e) => (e.target.value = value.String)}
                />
            </MUI.Paper>
        );
    }

    OnValidate(instance) {
        const slot = this.SlotAssert("value");
        const value = this.DataAssert(instance, slot);

        return !slot.Required || value.Value !== "";
    }
}
