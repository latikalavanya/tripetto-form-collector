// Import Material-UI UMD
const MUI = window["material-ui"];

/* tslint:disable-next-line:max-line-length */
const IS_URL = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

@TripettoCollector.node("tripetto-block-url")
class URL extends TripettoCollector.NodeBlock {
    OnRender(instance, action) {
        const slot = this.SlotAssert("url");
        const url = this.DataAssert(instance, slot);

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
                    type="url"
                    margin="normal"
                    fullWidth
                    required={slot.Required}
                    defaultValue={url.Value}
                    label={this.Node.Props.Placeholder || this.Node.Props.Name}
                    helperText={this.Node.Props.Explanation}
                    onChange={(e) => (url.Value = e.target.value)}
                    onBlur={(e) => (e.target.value = url.String)}
                />
            </MUI.Paper>
        );
    }

    OnValidate(instance) {
        const slot = this.SlotAssert("url");
        const url = this.DataAssert(instance, slot);

        if (slot.Required && url.Value === "") {
            return false;
        }

        if (url.Value !== "" && !IS_URL.test(url.Value)) {
            return false;
        }

        return true;
    }
}
