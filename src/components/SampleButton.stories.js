// ”@”が"/src"として正しく認識されるかの確認
import SampleButton from "@/components/SampleButton";

export default {
  title: "Sample/Button",
  component: SampleButton,
};

const Template = (args) => ({
  components: { SampleButton },
  setup() {
    return { args };
  },
  template: '<sample-button v-bind="args" />',
});

export const Button1 = Template.bind({});
Button1.args = {
  label: "Button1",
};

export const Button2 = Template.bind({});
Button2.args = {
  label: "Button2",
};