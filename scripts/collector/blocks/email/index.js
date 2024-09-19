// Import Material-UI UMD
const MUI = window["material-ui"];

/* tslint:disable-next-line:max-line-length */
const IS_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

@TripettoCollector.node("tripetto-block-email")
class Email extends TripettoCollector.NodeBlock {
    OnRender(instance, action) {
        const slot = this.SlotAssert("email");
        const email = this.DataAssert(instance, slot);

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
                    type="email"
                    margin="normal"
                    fullWidth
                    required={slot.Required}
                    defaultValue={email.Value}
                    label={this.Node.Props.Placeholder || this.Node.Props.Name}
                    helperText={this.Node.Props.Explanation}
                    onChange={(e) => (email.Value = e.target.value)}
                    onBlur={(e) => (e.target.value = email.String)}
                />
            </MUI.Paper>
        );
    }

    OnValidate(instance) {
        const slot = this.SlotAssert("email");
        const email = this.DataAssert(instance, slot);

        if (slot.Required && email.Value === "") {
            return false;
        }

        if (email.Value !== "" && !IS_EMAIL.test(email.Value)) {
            return false;
        }

        return true;
    }
}
