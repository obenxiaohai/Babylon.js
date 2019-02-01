import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { DefaultRenderingPipeline } from "babylonjs/PostProcesses/RenderPipeline/Pipelines/defaultRenderingPipeline";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LockObject } from "../lockObject";
import { CommonRenderingPipelinePropertyGridComponent } from './commonRenderingPipelinePropertyGridComponent';
import { SliderLineComponent } from '../../../lines/sliderLineComponent';
import { LineContainerComponent } from '../../../lineContainerComponent';
import { CheckBoxLineComponent } from '../../../lines/checkBoxLineComponent';
import { Vector2LineComponent } from '../../../lines/vector2LineComponent';
import { OptionsLineComponent } from '../../../lines/optionsLineComponent';
import { ImageProcessingConfiguration } from 'babylonjs/Materials/imageProcessingConfiguration';
import { Color3LineComponent } from '../../../lines/color3LineComponent';

interface IDefaultRenderingPipelinePropertyGridComponentProps {
    renderPipeline: DefaultRenderingPipeline,
    lockObject: LockObject,
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>
}

export class DefaultRenderingPipelinePropertyGridComponent extends React.Component<IDefaultRenderingPipelinePropertyGridComponentProps> {
    constructor(props: IDefaultRenderingPipelinePropertyGridComponentProps) {
        super(props);
    }

    render() {
        const renderPipeline = this.props.renderPipeline;

        const camera = renderPipeline.scene.activeCamera!;

        var toneMappingOptions = [
            { label: "Standard", value: ImageProcessingConfiguration.TONEMAPPING_STANDARD },
            { label: "ACES", value: ImageProcessingConfiguration.TONEMAPPING_ACES }
        ];

        var vignetteModeOptions = [
            { label: "Multiply", value: ImageProcessingConfiguration.VIGNETTEMODE_MULTIPLY },
            { label: "Opaque", value: ImageProcessingConfiguration.VIGNETTEMODE_OPAQUE }
        ];

        return (
            <div className="pane">
                <CommonRenderingPipelinePropertyGridComponent lockObject={this.props.lockObject} renderPipeline={renderPipeline} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                <LineContainerComponent title="BLOOM">
                    <CheckBoxLineComponent label="Enabled" target={renderPipeline} propertyName="bloomEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Threshold" minimum={0} maximum={1} step={0.05} target={renderPipeline} propertyName="bloomThreshold" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Weight" minimum={0} maximum={1} step={0.05} target={renderPipeline} propertyName="bloomWeight" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Kernel" minimum={0} maximum={128} step={1} target={renderPipeline} propertyName="bloomKernel" onPropertyChangedObservable={this.props.onPropertyChangedObservable} decimalCount={0} />
                    <SliderLineComponent label="Scale" minimum={0} maximum={1} step={0.25} target={renderPipeline} propertyName="bloomScale" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title="CHROMATIC ABERRATION">
                    <CheckBoxLineComponent label="Enabled" target={renderPipeline} propertyName="chromaticAberrationEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="aberrationAmount" minimum={0} maximum={128} step={0.1} target={renderPipeline.chromaticAberration} propertyName="aberrationAmount" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Radial intensity" minimum={0} maximum={1} step={0.01} target={renderPipeline.chromaticAberration} propertyName="radialIntensity" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Vector2LineComponent label="Center" target={renderPipeline.chromaticAberration} propertyName="centerPosition" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Vector2LineComponent label="Direction" target={renderPipeline.chromaticAberration} propertyName="direction" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title="DEPTH OF FIELD">
                    <CheckBoxLineComponent label="Enabled" target={renderPipeline} propertyName="depthOfFieldEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Focal length" minimum={0} maximum={camera.maxZ} step={0.1} target={renderPipeline.depthOfField} propertyName="focalLength" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="fStop" minimum={0} maximum={32} step={0.1} target={renderPipeline.depthOfField} propertyName="fStop" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Distance" minimum={0} maximum={camera.maxZ} step={0.1} target={renderPipeline.depthOfField} propertyName="focusDistance" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Lens size" minimum={0} maximum={1000} step={1} target={renderPipeline.depthOfField} propertyName="lensSize" onPropertyChangedObservable={this.props.onPropertyChangedObservable} decimalCount={0} />
                </LineContainerComponent>
                <LineContainerComponent title="FXAA">
                    <CheckBoxLineComponent label="Enabled" target={renderPipeline} propertyName="fxaaEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title="GLOW LAYER">
                    <CheckBoxLineComponent label="Enabled" target={renderPipeline} propertyName="glowLayerEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title="GRAIN">
                    <CheckBoxLineComponent label="Enabled" target={renderPipeline} propertyName="grainEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Animated" target={renderPipeline.grain} propertyName="animated" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Intensity" minimum={0} maximum={50} step={0.1} target={renderPipeline.grain} propertyName="intensity" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent title="IMAGE PROCESSING">
                    <CheckBoxLineComponent label="Enabled" target={renderPipeline} propertyName="imageProcessingEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        renderPipeline.imageProcessing &&
                        <div>
                            <SliderLineComponent minimum={0} maximum={4} step={0.1} label="Contrast" target={renderPipeline.imageProcessing} propertyName="contrast" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={4} step={0.1} label="Exposure" target={renderPipeline.imageProcessing} propertyName="exposure" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label="Tone mapping" target={renderPipeline.imageProcessing} propertyName="toneMappingEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <OptionsLineComponent label="Tone mapping type" options={toneMappingOptions} target={renderPipeline.imageProcessing} propertyName="toneMappingType" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ mode: value })} />
                            <CheckBoxLineComponent label="Vignette" target={renderPipeline.imageProcessing} propertyName="vignetteEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={4} step={0.1} label="Vignette weight" target={renderPipeline.imageProcessing} propertyName="vignetteWeight" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={1} step={0.1} label="Vignette stretch" target={renderPipeline.imageProcessing} propertyName="vignetteStretch" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={Math.PI} step={0.1} label="Vignette FOV" target={renderPipeline.imageProcessing} propertyName="vignetteCameraFov" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={1} step={0.1} label="Vignette center X" target={renderPipeline.imageProcessing} propertyName="vignetteCentreX" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent minimum={0} maximum={1} step={0.1} label="Vignette center Y" target={renderPipeline.imageProcessing} propertyName="vignetteCentreY" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Color3LineComponent label="Vignette color" target={renderPipeline.imageProcessing} propertyName="vignetteColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <OptionsLineComponent label="Vignette blend mode" options={vignetteModeOptions} target={renderPipeline.imageProcessing} propertyName="vignetteBlendMode" onPropertyChangedObservable={this.props.onPropertyChangedObservable} onSelect={(value) => this.setState({ mode: value })} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent title="SHARPEN">
                    <CheckBoxLineComponent label="Enabled" target={renderPipeline} propertyName="sharpenEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Color amount" minimum={0} maximum={1} step={0.05} target={renderPipeline.sharpen} propertyName="colorAmount" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Edge amount" minimum={0} maximum={5} step={0.05} target={renderPipeline.sharpen} propertyName="edgeAmount" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
            </div>
        );
    }
}