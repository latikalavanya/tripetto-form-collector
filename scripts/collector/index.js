import { CollectorWrapper } from "./wrapper";

// Import blocks
import "./blocks";

// Import Material-UI UMD
const MUI = window["material-ui"];

export class Collector extends React.Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.collector = new CollectorWrapper(
      props.definition,
      false,
      this.update.bind(this),
      this.end.bind(this)
    );

    if (!props.snapshot || !this.collector.Resume(props.snapshot)) {
      this.collector.Start();
    }
  }

  load(definition) {
    this.mounted = false;
    
    this.collector = new CollectorWrapper(
      definition,
      false,
      this.update.bind(this),
      this.end.bind(this)
    );
    this.collector.Start();
    
    this.mounted = true;
    
    this.forceUpdate();
  }

  update() {
    if (this.mounted) {
      this.forceUpdate();
    }
  }

  end(instance, type) {
    if (type === "ended") {
      // Output the collected data to the console
      console.dir(instance.Values);
    }
  }

  render() {
    let content = this.collector.render();

    if (!content) {
      if (this.collector.IsEnded) {
        content = (
          <MUI.Grid
            container
            direction="column"
            spacing={24}
            style={{ padding: "24px" }}
          >
            <MUI.Grid item>
              <MUI.Paper elevation={1} style={{ padding: "16px 24px" }}>
                <MUI.Typography variant="headline" color="inherit">
                  Form completed!
                </MUI.Typography>
                <MUI.Typography variant="subheading" color="inherit">
                  Open the developer console to see the collected data.
                </MUI.Typography>
              </MUI.Paper>
            </MUI.Grid>
          </MUI.Grid>
        );
      } else if (this.collector.IsStopped) {
        content = (
          <MUI.Grid
            container
            direction="column"
            spacing={24}
            style={{ padding: "24px" }}
          >
            <MUI.Grid item>
              <MUI.Paper elevation={1} style={{ padding: "16px 24px" }}>
                <MUI.Typography variant="headline" color="inherit">
                  Form is stopped!
                </MUI.Typography>
              </MUI.Paper>
            </MUI.Grid>
          </MUI.Grid>
        );
      } else if (this.collector.IsPaused) {
        content = (
          <MUI.Grid
            container
            direction="column"
            spacing={24}
            style={{ padding: "24px" }}
          >
            <MUI.Grid item>
              <MUI.Paper elevation={1} style={{ padding: "16px 24px" }}>
                <MUI.Typography variant="headline" color="inherit">
                  Form paused!
                </MUI.Typography>
                <MUI.Typography variant="subheading" color="inherit">
                  Click <b>Resume</b> to resume it. Open the developer console
                  to see the resume data.
                </MUI.Typography>
              </MUI.Paper>
            </MUI.Grid>
          </MUI.Grid>
        );
      } else {
        content = (
          <MUI.Grid
            container
            direction="column"
            spacing={24}
            style={{ padding: "24px" }}
          >
            <MUI.Grid item>
              <MUI.Paper elevation={1} style={{ padding: "16px 24px" }}>
                <MUI.Typography variant="headline" color="inherit">
                  Form not running
                </MUI.Typography>
                <MUI.Typography variant="subheading" color="inherit">
                  Refresh your browser.
                </MUI.Typography>
              </MUI.Paper>
            </MUI.Grid>
          </MUI.Grid>
        );
      }
    }

    return (
      <MUI.MuiThemeProvider
        theme={MUI.createMuiTheme({
          palette: {
            primary: MUI.colors.blue
          }
        })}
      >
        <MUI.Grid container direction="column">
          <MUI.AppBar position="static">
            <MUI.Toolbar>
              <MUI.IconButton color="inherit">
                <MUI.Icon>chat</MUI.Icon>
              </MUI.IconButton>
              <MUI.Typography
                variant="title"
                color="inherit"
                style={{ flex: 1 }}
              >
                {this.collector.Ontology
                  ? this.collector.Ontology.Name
                  : "Unnamed"}
              </MUI.Typography>
              <MUI.Button
                color="inherit"
                disabled={!this.collector.IsStopped && !this.collector.IsEnded}
                onClick={() => this.collector.Start()}
              >
                <MUI.Icon>play_arrow</MUI.Icon>&nbsp;Start
              </MUI.Button>
              <MUI.Button
                color="inherit"
                disabled={!this.collector.IsRunning}
                onClick={() =>
                  console.dir((this.resumeData = this.collector.Pause()))
                }
              >
                <MUI.Icon>pause</MUI.Icon>&nbsp;Pause
              </MUI.Button>
              <MUI.Button
                color="inherit"
                disabled={!this.collector.IsPaused || !this.resumeData}
                onClick={() => {
                  if (this.resumeData) {
                    this.collector.Resume(this.resumeData);
                  }
                }}
              >
                <MUI.Icon>restore</MUI.Icon>&nbsp;Resume
              </MUI.Button>
              <MUI.Button
                color="inherit"
                disabled={!this.collector.IsRunning}
                onClick={() => this.collector.Stop()}
              >
                <MUI.Icon>stop</MUI.Icon>&nbsp;Stop
              </MUI.Button>
            </MUI.Toolbar>
          </MUI.AppBar>

          <MUI.Grid item style={{ paddingTop: 64 }}>
            {content}
          </MUI.Grid>
        </MUI.Grid>
      </MUI.MuiThemeProvider>
    );
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }
}
