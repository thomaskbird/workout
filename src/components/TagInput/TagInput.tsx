import FormGroup from '@app/components/FormGroup/FormGroup';
import useTags from '@app/hooks/useTags';
import { TagType } from '@app/types/types';
import { Autocomplete, TextField } from '@mui/material';

export type TagInputProps = {
  indentifier: string;
  label: string;
  selectedTags: TagType[];
  onSetSelectedTags(tags: TagType[]): void;
  placeholder: string;
}

const TagInput = ({ indentifier, label, placeholder, selectedTags, onSetSelectedTags }: TagInputProps) => {
  const { tags, addTag } = useTags();

  return (
    <FormGroup>
      {/* todo: look into Autocomplete -> Multiple Values -> freeSolo */}
      <Autocomplete
        multiple
        id={indentifier}
        options={tags}
        getOptionLabel={(option) => (option as TagType)?.tag}
        filterSelectedOptions
        value={selectedTags}
        freeSolo
        onChange={(evt, val) => {
          const tagsToBeAdded: TagType[] = [];
          val.forEach(async (item: string | TagType) => {
            if(typeof item === 'string') {
              const newTag = await addTag(item);
              tagsToBeAdded.push(newTag);
            } else {
              tagsToBeAdded.push(item);
            }
          });

          onSetSelectedTags(tagsToBeAdded);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    </FormGroup>
  )
}

export default TagInput;
