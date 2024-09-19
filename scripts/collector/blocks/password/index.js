// Import Material-UI UMD
const MUI = window["material-ui"];

@TripettoCollector.node("tripetto-block-password")
class Password extends TripettoCollector.NodeBlock {
    OnRender(instance, action) {
        const slot = this.SlotAssert("password");
        const password = this.DataAssert(instance, slot);

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
                    type="password"
                    margin="normal"
                    fullWidth
                    required={slot.Required}
                    defaultValue={password.Value}
                    label={this.Node.Props.Placeholder || this.Node.Props.Name}
                    helperText={this.Node.Props.Explanation}
                    onChange={(e) => (password.Value = e.target.value)}
                    onBlur={(e) => (e.target.value = password.String)}
                />
            </MUI.Paper>
        );
    }

    OnValidate(instance) {
        const slot = this.SlotAssert("password");
        const password = this.DataAssert(instance, slot);

        return !slot.Required || password.Value !== "";
    }
}