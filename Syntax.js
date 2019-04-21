<FlatList
          data={[{name:'bob'},{name:'tim'}]}
          keyExtractor={(x,i) => i}
          renderItem={({item}) =>
            <Text>
              {item.name}
            </Text>
          }
        />
