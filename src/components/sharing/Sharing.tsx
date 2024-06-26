import React from "react";

import { useState } from "react";
import {
  Combobox,
  Flex,
  Group,
  Input,
  InputBase,
  Select,
  Text,
  useCombobox,
} from "@mantine/core";
import { IconLock, IconWorld } from "@tabler/icons-react";
import { BankResponse } from "@/types/bank";

interface Item {
  value: string;
  title: string;
  description: string;
}

const groceries: Item[] = [
  {
    value: "1",
    title: "Anyone with the link",
    description: "Anyone on the Internet with the link can view",
  },
  {
    value: "2",
    title: "Restricted",
    description: "Only people with access can open with the link",
  },
];

interface Props {
  bankData: BankResponse;
  setBankData: React.Dispatch<React.SetStateAction<BankResponse>>;
}

function SelectOption({ value, title, description }: Item) {
  return (
    <Group display={"flex"} wrap="nowrap">
      <Text fz={20}>
        {value === "1" ? <IconWorld></IconWorld> : <IconLock></IconLock>}
      </Text>
      <div>
        <Text fz="sm" fw={500}>
          {title}
        </Text>
        <Text fz="xs" opacity={0.6}>
          {description}
        </Text>
      </div>
    </Group>
  );
}

const Sharing = ({ bankData, setBankData }: Props) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string>(
    bankData.quizPublicity ? "1" : "2"
  );

  const selectedOption = groceries.find((item) => item.value === value);

  const handleChange = (value: string) => {
    //setBank that bank.quizPublicity = value
    setBankData({
      ...bankData,
      quizPublicity: value === "1" ? true : false,
    });
  };

  const handleChangeEdit = (value: string | null) => {
    //setBank that bank quizEditable = value
    setBankData({
      ...bankData,
      publicEditable: value === "1" ? true : false,
    });
  };

  const options = groceries.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <SelectOption {...item} />
    </Combobox.Option>
  ));

  return (
    <Flex>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          setValue(val);
          handleChange(val);
          combobox.closeDropdown();
        }}
        position="top"
      >
        <Combobox.Target>
          <InputBase
            w={"100%"}
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
            multiline
            defaultValue={value}
          >
            {selectedOption ? (
              <>
                <SelectOption {...selectedOption} />
              </>
            ) : (
              <Input.Placeholder>Pick value</Input.Placeholder>
            )}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown w={"100%"}>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {value === "1" && (
        <Select
          w={100}
          data={["Edit", "View"]}
          defaultValue={bankData.publicEditable ? "Edit" : "View"}
          bg={"white"}
          variant="subtle"
          onChange={(val) => handleChangeEdit(val)}
        ></Select>
      )}
    </Flex>
  );
};

export default Sharing;
