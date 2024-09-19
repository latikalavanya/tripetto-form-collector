// Import Material-UI UMD
const MUI = window["material-ui"];

@TripettoCollector.node("tripetto-block-radiobuttons")
class Radiobuttons extends TripettoCollector.NodeBlock {
    Update(data, id, instance) {
        const value = Tripetto.F.FindFirst(this.Props.Radiobuttons, (radiobutton) => radiobutton.Id === id);

        data.Set(value ? value.Value || value.Name : value, id);
    }

    OnRender(instance, action) {
        const button = this.DataAssert(instance, "button");
        const selected =
            Tripetto.F.FindFirst(this.Props.Radiobuttons, (radiobutton) =>
                Tripetto.F.CastToBoolean(button.Reference === radiobutton.Id)
            ) || Tripetto.F.ArrayItem(this.Props.Radiobuttons, 0);

        if (selected) {
            this.Update(button, selected.Id, instance);
        }

        return (
            <MUI.Paper elevation={1} style={{ padding: "8px 24px 8px" }}>
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

                <MUI.FormControl component="fieldset">
                    {this.Node.Props.Explanation && <MUI.FormHelperText>{this.Node.Props.Explanation}</MUI.FormHelperText>}
                    <MUI.RadioGroup value={selected ? selected.Id : ""} onChange={(e: {}, id: string) => this.Update(button, id, instance)}>
                        {this.Props.Radiobuttons.map((radiobutton: IRadiobutton) => {
                            return (
                                <MUI.FormControlLabel
                                    key={radiobutton.Id}
                                    value={radiobutton.Id}
                                    control={<MUI.Radio />}
                                    label={radiobutton.Name}
                                />
                            );
                        })}
                    </MUI.RadioGroup>
                </MUI.FormControl>
            </MUI.Paper>
        );
    }

    OnValidate(instance) {
        return true;
    }
}
